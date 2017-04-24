$(document).ready(function() {
    console.log('LOADED');
    ajaxGetSessions();
});

// ######################### build DOM landing page #########################

var buildDomSessions = function(data) {

    $('#content').empty();

    $('#content').load('session.html', function() {

        var totalProfit = 0;
        var totalTimePlayed = 0;

        // ######################### create list of finished sessions #########################

        data.forEach(function(v, i, a) {

            if (!v.isActive) {
                var $newTr = $('<tr>');

                var $profitTd = $('<td>');
                var profit = v.cashOut - v.buyIn;
                totalProfit += profit;
                $profitTd.text(parseInt(profit));

                if (profit >= 0) {
                    $profitTd.addClass('winningSession');
                } else if (profit < 0) {
                    $profitTd.addClass('losingSession');
                } else {
                    console.log('Error: profit is NaN');
                }

                var $timePlayedTd = $('<td>');
                var timePlayed = getTimePlayed(v.startTime, v.endTime);
                totalTimePlayed += timePlayed;
                $timePlayedTd.text(getHumanReadableTimePlayed(timePlayed));


                var $tournament = $('<td>');

                if (v.tournament) {
                    $tournament.text('Yes');
                } else {
                    $tournament.text('No');
                }

                var $game = $('<td>');
                $game.text(v.game);

                var $blinds = $('<td>');
                $blinds.text(v.blinds);

                var $location = $('<td>');
                $location.text(v.location);

                var $notes = $('<td>');;
                $notes.text(v.notes.length);

                $newTr.append($profitTd, $timePlayedTd, $tournament, $game, $blinds, $location, $notes);
                $('#allSessions').append($newTr);

                $($newTr).on('click', function(e) {
                    e.preventDefault();

                    ajaxGetSessionById(v.id);
                });

                // ######################### add active sessions #########################

            } else {

                $('#activeGame').load('activesession.html', function() {

                    $('#game').append(v.game);
                    $('#buyIn').append(v.buyIn);
                    $('#location').append(v.location);
                    $('#blinds').append(v.blinds);
                    $('#startTime').append(v.startTime);

                    if (v.tournament !== null) {
                        $('#activeGame').append('<p>Starting Stack: $' + v.tournament.startingStack + '</p>')
                        $('#activeGame').append('<p>Number of Players: ' + v.tournament.numberPlayers + '</p>')
                        $('#isTournament').append('<input type="text" name="inMoney" placeholder="In Money">');
                        $('#isTournament').append('<input type="number" name="placeFinished" placeholder="Place Finished">');
                    };

                    $('#activeGame').append()

                    $('#endSession').on('click', function(e){

                      v.cashOut = $(endThisSession.cashOut).val();
                      v.endTime = new Date();
                      v.isActive = false;

                      ajaxPutSession(v);

                    });

                });
            };
        });

        // ######################### create summary of sessions #########################

        var $totalProfit = $('<h3>Total Profit: $' + totalProfit + '</h3>');

        if (totalProfit >= 0) {
            $totalProfit.addClass('winningSession');
        } else if (totalProfit < 0) {
            $totalProfit.addClass('losingSession');
        } else {
            console.log('Error: totalProfit is NaN');
        }

        var $totalTimePlayed = $('<h3>Total Time Played: ' + (getHumanReadableTimePlayed(totalTimePlayed)) +
            '</h3>');

        var perHourProfit = ((totalProfit / totalTimePlayed) * 60).toFixed(2);
        var $perHourProfit = $('<h3>Hourly Profit: $' + perHourProfit + '</h3>');

        $('#summary').append($totalProfit, $totalTimePlayed, $perHourProfit);

        // ######################### create form to start a new session #########################

        $('#startSessionButton').on('click', function(e) {
            e.preventDefault();

            var session = {
                game: $(newSessionForm.game).val(),
                buyIn: $(newSessionForm.buyIn).val(),
                location: $(newSessionForm.location).val(),
                blinds: $(newSessionForm.blinds).val(),
                startTime: new Date(),
                isActive: true
            }

            var ss = $(newSessionForm.startingStack).val();
            var np = $(newSessionForm.numberPlayers).val();

            if (ss !== "" || np !== "") {
                var tournament = {
                    startingStack: ss,
                    numberPlayers: np,
                }
                session.tournament = tournament;
            }

            ajaxPostSession(session);

        });

        $('.tournamentClass').hide();

        $('#radioYes').on('click', function(e) {
            $('.tournamentClass').show();
        });

        $('#radioNo').on('click', function(e) {
            $('.tournamentClass').hide();
        });

    });
};

// ######################### buildDomSingleSession #########################

var buildDomViewSession = function(v) {

    $('#content').empty();

    $('#content').load('viewsession.html', function() {

        $('#profit').append(v.cashOut - v.buyIn);

        var timePlayed = getTimePlayed(v.startTime, v.endTime);
        $('#timePlayed').append(getHumanReadableTimePlayed(timePlayed));

        $('#timeStarted').append(v.startTime);
        $('#timeFinished').append(v.endTime);
        $('#buyIn').append(v.buyIn);
        $('#cashOut').append(v.cashOut);
        $('#game').append(v.game);

        if (v.tournament !== null) {
            $('#tournament').append('<p>Starting Stack: $' + v.tournament.startingStack + '</p>')
            $('#tournament').append('<p>Number of Players: ' + v.tournament.numberPlayers + '</p>')
            $('#tournament').append('<p>In the Money: ' + v.tournament.inMoney + '</p>')
            $('#tournament').append('<p>Finished: ' + v.tournament.placeFinished + '</p>')
        } else {
            $('#tournament').empty();
        };

        if (v.notes.length > 0) {
            $('#notes').show();
            v.notes.forEach(function(x, i, a) {
                $('#notes').append('<p>' + x.timestamp + ': ' + x.text);
            });
        } else {
            $('#notes').empty();
        };

        $('#returnHome').on('click', function(e) {
            e.preventDefault();
            ajaxGetSessions();
        });

        $('#deleteSession').on('click', function(e) {
            e.preventDefault();
            ajaxDeleteSessionById(v.id);
        });

        $('#editSession').on('click', function(e) {
            e.preventDefault();
            console.log("edit button clicked");
        });

    });
};

// ######################### ajax requests #########################

var ajaxGetSessions = function() {

    $.ajax({
        type: 'Get',
        url: 'rest/sessions/',
        dataType: 'json'
    }).done(function(data, status) {
        buildDomSessions(data);
    }).fail(function(xhr, status, error) {
        console.log(status + ": " + error);
    });

};

var ajaxGetSessionById = function(id) {
    $.ajax({
        type: 'Get',
        url: 'rest/sessions/' + id,
        dataType: 'json'
    }).done(function(data, status) {
        buildDomViewSession(data);
    }).fail(function(xhr, status, error) {
        console.log(status + ": " + error);
    });
};

var ajaxDeleteSessionById = function(id) {
    $.ajax({
        type: 'Delete',
        url: 'rest/sessions/' + id,
    }).done(function() {
        ajaxGetSessions();
    }).fail(function(xhr, status, error) {
        console.log(status + ": " + error);
    });
};

var ajaxPostSession = function(session) {
    $.ajax({
        type: 'Post',
        url: 'rest/sessions/',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(session)
    }).done(function() {
        ajaxGetSessions();
    }).fail(function(xhr, status, error) {
        console.log(status + ": " + error);
    });
};

var ajaxPutSession = function(session) {

    $.ajax({
        type: 'Put',
        url: 'rest/sessions/' + session.id,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(session)
    }).done(function() {
        ajaxGetSessions();
    }).fail(function(xhr, status, error) {
        console.log(status + ": " + error);
    });
};

// ######################### human readable time functions #########################

var getTimePlayed = function(st, et) {

    var totalMinutes = parseInt(((new Date(et)).valueOf() - (new Date(st)).valueOf()) / 60000);

    return totalMinutes;
};

var getHumanReadableTimePlayed = function(totalMinutes) {

    var minutes = totalMinutes % 60;
    var hours = parseInt(totalMinutes / 60);

    return hours + " hrs " + minutes + " mins";
};
