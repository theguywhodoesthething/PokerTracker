package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.SessionDAO;
import entities.Session;

@RestController
public class SessionController {

	@Autowired
	private SessionDAO sessionDao;

	@RequestMapping(value = "ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}

	@RequestMapping(value = "sessions/active/{active}", method = RequestMethod.GET)
	public List<Session> index(@PathVariable boolean active) {

		return sessionDao.index(active);
	}

	@RequestMapping(value = "sessions/{id}", method = RequestMethod.GET)
	public Session show(@PathVariable int id) {
		return sessionDao.show(id);
	}

	@RequestMapping(value = "sessions", method = RequestMethod.POST)
	public Session create(@RequestBody String sessionJSON, HttpServletResponse res) {

		ObjectMapper mapper = new ObjectMapper();

		try {

			Session mappedSession = mapper.readValue(sessionJSON, Session.class);
			Session persistedSession = sessionDao.create(mappedSession);
			res.setStatus(202);
			return persistedSession;
		} catch (Exception e) {

			e.printStackTrace();
			return null;
		}
	}

	@RequestMapping(value = "sessions/{id}", method = RequestMethod.PUT)
	public Session update(@PathVariable int id, @RequestBody String sessionJSON, HttpServletResponse res) {

		ObjectMapper mapper = new ObjectMapper();

		try {

			Session mappedSession = mapper.readValue(sessionJSON, Session.class);
			Session persistedSession = sessionDao.update(id, mappedSession);
			res.setStatus(202);
			return persistedSession;
		} catch (Exception e) {

			e.printStackTrace();
			return null;
		}
	}

	@RequestMapping(value = "sessions/{id}", method = RequestMethod.DELETE)
	public boolean destroy(@PathVariable int id) {
		return sessionDao.destroy(id);
	}
}
