package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Location;
import entities.Note;
import entities.Session;

@Transactional
public class SessionDAOImpl implements SessionDAO {
	
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Session> index() {

		String query = "SELECT s FROM Session s";
		return em.createQuery(query, Session.class).getResultList();
	}

	@Override
	public Session show(int id) {

		return em.find(Session.class, id);
	}

	@Override
	public Session create(Session session) {
				
		if(session.getTournament() != null){
			em.persist(session.getTournament());
		}
		
		if(session.getLocation().getId() <= 0){		
			em.persist(session.getLocation());
		}
		
		if(session.getNotes() != null){
			em.persist(session.getNotes());
		}
		
		em.persist(session);		
		em.flush();
		return session;
	}

	@Override
	public Session update(int id, Session session) {

		Session managedSession = em.find(Session.class, id);
		
		if(session.getBuyIn() != null) {
			managedSession.setBuyIn(session.getBuyIn());
		}
		
		if(session.getCashOut() != null) {
			managedSession.setCashOut(session.getCashOut());
		}
		
		if(session.getEndTime() != null) {
			managedSession.setEndTime(session.getEndTime());
		}
		
		if(session.getGame() != null) {
			managedSession.setGame(session.getGame());
		}
		
		if(session.getStartTime() != null) {
			managedSession.setStartTime(session.getStartTime());
		}
		
		if(session.getTournament() != null) {
			managedSession.setTournament(session.getTournament());
		}
		
		if(session.getLocation() != null){
			managedSession.setLocation(session.getLocation());
		}
		
		if(session.getNotes() != null){
			session.getNotes().addAll(managedSession.getNotes());
			managedSession.setNotes(session.getNotes());
		}
		
		em.persist(managedSession);
		em.flush();
		
		return managedSession;
	}

	@Override
	public boolean destroy(int id) {
		
		try {
			Session managedSession = em.find(Session.class, id);
			
			if(managedSession.getTournament() != null) {
				em.remove(managedSession.getTournament());
			}
			
			if(managedSession.getNotes() != null) {
				for(Note n : managedSession.getNotes()){
					em.remove(n);
				}
			}
			
			em.remove(managedSession);
			em.flush();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
