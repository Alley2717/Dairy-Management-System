// MilkRecordRepository.java
package com.example.dairyfarm.repository;

import com.example.dairyfarm.model.MilkRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MilkRecordRepository extends JpaRepository<MilkRecord, Long> {}
