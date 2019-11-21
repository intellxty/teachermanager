package com.bdap.teachermanager.web.rest;

import com.bdap.teachermanager.domain.Homework;
import com.bdap.teachermanager.service.HomeworkService;
import com.bdap.teachermanager.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.bdap.teachermanager.domain.Homework}.
 */
@RestController
@RequestMapping("/api")
public class HomeworkResource {

    private final Logger log = LoggerFactory.getLogger(HomeworkResource.class);

    private static final String ENTITY_NAME = "homework";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HomeworkService homeworkService;

    public HomeworkResource(HomeworkService homeworkService) {
        this.homeworkService = homeworkService;
    }

    /**
     * {@code POST  /homework} : Create a new homework.
     *
     * @param homework the homework to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new homework, or with status {@code 400 (Bad Request)} if the homework has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/homework")
    public ResponseEntity<Homework> createHomework(@Valid @RequestBody Homework homework) throws URISyntaxException {
        log.debug("REST request to save Homework : {}", homework);
        if (homework.getId() != null) {
            throw new BadRequestAlertException("A new homework cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Homework result = homeworkService.save(homework);
        return ResponseEntity.created(new URI("/api/homework/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /homework} : Updates an existing homework.
     *
     * @param homework the homework to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated homework,
     * or with status {@code 400 (Bad Request)} if the homework is not valid,
     * or with status {@code 500 (Internal Server Error)} if the homework couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/homework")
    public ResponseEntity<Homework> updateHomework(@Valid @RequestBody Homework homework) throws URISyntaxException {
        log.debug("REST request to update Homework : {}", homework);
        if (homework.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Homework result = homeworkService.save(homework);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, homework.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /homework} : get all the homework.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of homework in body.
     */
    @GetMapping("/homework")
    public ResponseEntity<List<Homework>> getAllHomework(Pageable pageable) {
        log.debug("REST request to get a page of Homework");
        Page<Homework> page = homeworkService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());

    }
    @GetMapping("/homework/student/{id}")
    public ResponseEntity<List<Homework>> getStudentHomework(@PathVariable String id) {
        log.debug("REST request to get a page of Homework");
        List<Homework> homework = homeworkService.findByOwner(id);
        return ResponseEntity.ok().body(homework);
    }

    /**
     * {@code GET  /homework/:id} : get the "id" homework.
     *
     * @param id the id of the homework to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the homework, or with status {@code 404 (Not Found)}.
     */
    /*@GetMapping("/homework/{id}")
    public ResponseEntity<Homework> getHomework(@PathVariable String id) {
        log.debug("REST request to get Homework : {}", id);
        Optional<Homework> homework = homeworkService.findOne(id);
        return ResponseUtil.wrapOrNotFound(homework);
    }*/

    /**
     * {@code DELETE  /homework/:id} : delete the "id" homework.
     *
     * @param id the id of the homework to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/homework/{id}")
    public ResponseEntity<Void> deleteHomework(@PathVariable String id) {
        log.debug("REST request to delete Homework : {}", id);
        homeworkService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }

    /**
     * {@code SEARCH  /_search/homework?query=:query} : search for the homework corresponding
     * to the query.
     *
     * @param query the query of the homework search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/homework")
    public ResponseEntity<List<Homework>> searchHomework(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Homework for query {}", query);
        Page<Homework> page = homeworkService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
