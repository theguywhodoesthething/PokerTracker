package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Tournament {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "number_players")
	private int numberPlayers;
	
	@Column(name = "in_money")
	private boolean inMoney;
	
	@Column(name = "place_finished")
	private int placeFinished;
	
	@Column(name = "starting_stack")
	private int startingStack;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "session_id")
	@JsonBackReference
	private Session session;

	public int getNumberPlayers() {
		return numberPlayers;
	}

	public void setNumberPlayers(int numberPlayers) {
		this.numberPlayers = numberPlayers;
	}

	public boolean isInMoney() {
		return inMoney;
	}

	public void setInMoney(boolean inMoney) {
		this.inMoney = inMoney;
	}

	public int getPlaceFinished() {
		return placeFinished;
	}

	public void setPlaceFinished(int placeFinished) {
		this.placeFinished = placeFinished;
	}

	public int getId() {
		return id;
	}

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}

	public int getStartingStack() {
		return startingStack;
	}

	public void setStartingStack(int startingStack) {
		this.startingStack = startingStack;
	}

}
