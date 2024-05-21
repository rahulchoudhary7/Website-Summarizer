package com.boot.summarizer.serivce;

import com.boot.summarizer.entities.History;
import com.boot.summarizer.repositories.HistoryRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ApiService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private HistoryRepo historyRepo;

    public String summarizeWebsite(String url) {
        String fastApiUrl = "http://python_server:8000/api/summarize";
//        String fastApiUrl = "http://localhost:8000/api/summarize";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestJson = String.format("{\"url\": \"%s\"}", url);

        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(fastApiUrl, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            History history = new History();
            history.setUrl(url);
            history.setUrlSummary(response.getBody());

            historyRepo.save(history);
            return response.getBody();
        } else {
            throw new RuntimeException("Failed to summarize website");
        }
    }

    public List<History> getAllHistory(){
        return historyRepo.findAll();
    }

    @Transactional

    public void deleteHistory(Long id) {
        historyRepo.deleteById(id);
    }
}

