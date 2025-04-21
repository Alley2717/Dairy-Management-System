package com.example.dairyfarm.repository;

import com.example.dairyfarm.model.Breed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BreedRepository extends JpaRepository<Breed, Long> {
}