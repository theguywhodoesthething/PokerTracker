package entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Session {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "buy_in")
	private Double buyIn;

	@Column(name = "cash_out")
	private Double cashOut;

	@Column(name = "start_time")
	private String startTime;

	@Column(name = "end_time")
	private String endTime;

	private String game;
	private String location;
	private String blinds;
	
	@Column(name = "is_active")
	private Boolean isActive;
	
	@OneToOne(mappedBy = "session")
	@JsonManagedReference
	private Tournament tournament;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "session")
	@JsonManagedReference
	private Set<Note> notes;

	public Double getBuyIn() {
		return buyIn;
	}

	public void setBuyIn(Double buyIn) {
		this.buyIn = buyIn;
	}

	public Double getCashOut() {
		return cashOut;
	}

	public void setCashOut(Double cashOut) {
		this.cashOut = cashOut;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getGame() {
		return game;
	}

	public void setGame(String game) {
		this.game = game;
	}

	public int getId() {
		return id;
	}

	public Tournament getTournament() {
		return tournament;
	}

	public void setTournament(Tournament tournament) {
		this.tournament = tournament;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Set<Note> getNotes() {
		return notes;
	}

	public void setNotes(Set<Note> notes) {
		this.notes = notes;
	}

	public String getBlinds() {
		return blinds;
	}

	public void setBlinds(String blinds) {
		this.blinds = blinds;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	
}
