// VetVisitRepository.java
package com.example.dairyfarm.repository;

import com.example.dairyfarm.model.VetVisit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VetVisitRepository extends JpaRepository<VetVisit, Long> {
}
