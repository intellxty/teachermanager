package com.bdap.teachermanager.repository;
import com.bdap.teachermanager.domain.Homework;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Homework entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HomeworkRepository extends MongoRepository<Homework, String> {

}