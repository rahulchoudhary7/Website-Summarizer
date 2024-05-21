package com.boot.summarizer.controller;

import com.boot.summarizer.entities.History;
import com.boot.summarizer.serivce.ApiService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AppController {

    @Autowired
    private ApiService apiService;

    @PostMapping("/summarize")
    public ResponseEntity<String> summarizeWebsite(@RequestBody WebsiteUrl websiteUrl) {
        System.out.println("Helooooo");
        String result = apiService.summarizeWebsite(websiteUrl.getUrl());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/getHistory")
    public ResponseEntity<List<History>> getAll(){
        List<History> histories = apiService.getAllHistory();

        return new ResponseEntity<>(histories, HttpStatus.OK);
    }

    @DeleteMapping("/deleteHistory/{id}")
    public void deleteHistory(@PathVariable Long id) {
        apiService.deleteHistory(id);
    }

    @GetMapping("/healthCheck")
    public ResponseEntity<String> healthCheck(){
        return new ResponseEntity<>("Health is 100", HttpStatus.OK);
    }

}

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
class WebsiteUrl {
    private String url;

}

