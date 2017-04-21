package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Session;
import entities.Tournament;

public class TrackerTest {

	private EntityManagerFactory emf = null;
	private EntityManager em = null;
	Tournament tournament = null;
	Session session = null;

	@Before
	public void setUp() throws Exception {
		emf = Persistence.createEntityManagerFactory("QuizPU");
		em = emf.createEntityManager();
		session = em.find(Session.class, 2);
		tournament = em.find(Tournament.class, 1);
	}
	
	@Test
	public void test_session() {
		assertEquals(525, session.getBuyIn());
	}
	
	@Test
	public void test_tournament() {
		assertEquals(93, tournament.getNumberPlayers());
		
	}
	
	@Test
	public void test_session_tournament() {
		assertEquals(28, session.getTournament().getPlaceFinished());
	}
	
	@Test
	public void test_tournament_session() {
		assertEquals("Caeser's Palace", tournament.getSession().getLocation());
	}
	
	@After
	public void tearDown() throws Exception {
		em.close();
		emf.close();
	}
	

}
