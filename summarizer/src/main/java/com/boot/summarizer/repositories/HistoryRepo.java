package com.boot.summarizer.repositories;

import com.boot.summarizer.entities.History;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepo extends JpaRepository<History, Long> {
}
