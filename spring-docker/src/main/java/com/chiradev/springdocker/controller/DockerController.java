package com.chiradev.springdocker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DockerController {

    @GetMapping("/docker")
    public String DockerDemo(){
        return "Dockerizing spring boot Application";
    }
}
