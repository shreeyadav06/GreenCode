package com.tracker;

import com.sun.net.httpserver.HttpServer;
import com.tracker.server.FamilyHandler;
import com.tracker.service.FamilyService;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {
    public static void main(String[] args) throws IOException {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        FamilyService familyService = new FamilyService();

        // Register handlers
        server.createContext("/api/family", new FamilyHandler(familyService));

        server.setExecutor(null); // default executor
        server.start();

        System.out.println("================================");
        System.out.println("GreenCode Backend (v0.4) Started");
        System.out.println("Port: " + port);
        System.out.println("Endpoint: http://localhost:8080/api/family");
        System.out.println("================================");
    }
}
