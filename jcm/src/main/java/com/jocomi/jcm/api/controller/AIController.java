package com.jocomi.jcm.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AIController {

	private final String GPT_API_KEY ="";
	
    @ResponseBody
    @PostMapping(value = "/view", produces = "application/json;charset=UTF-8")
    public String createView(@RequestBody String request) {
        System.out.println(request);

        try {
            // API URL 설정
            URL url = new URL("");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // 요청 헤더 설정
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + GPT_API_KEY);
            connection.setDoOutput(true);

            // Jackson을 사용하여 JSON 요청 본문 생성
            ObjectMapper objectMapper = new ObjectMapper();
            ObjectNode jsonBody = objectMapper.createObjectNode();

            jsonBody.put("model", "gpt-4o-mini");

            ArrayNode messages = objectMapper.createArrayNode();

            ObjectNode userMessage = objectMapper.createObjectNode();
            userMessage.put("role", "user");
            userMessage.put("content", request);

            ObjectNode systemMessage = objectMapper.createObjectNode();
            systemMessage.put("role", "system");
            systemMessage.put("content", "You are an expert web page designer and need to make a perfect page using VSCode with HTML, CSS, js in html code. "
                    + "Answer with only codes and do not add any description or other content like '```html' or '```'. "
                    + "Logo has to be import later. Create logo position and write '(insert logo here)'. "
                    + "Header and footer must be contained, and footer must have class name and decorated by class name "
                    + "Each section has to contain texts more than 5 sentences. "
                    + "Each section has to be fully decorated with CSS not using tag name, using class name, with the latest trends. "
                    + "Use animation effects with JavaScript. "
                    + "Add CSS in HTML file using style tag. "
                    + "Add JS in HTML file using script tag. "
                    + "Use images also, and file paths have to be '/testImg/main.jpg' or '/testImg/test.jpg'. "
                    + "You can use one image multiple times, and also you can edit file with CSS. Please use image small size via CSS. "
                    + "Content alignment should be centered. "
                    + "Do not use annotations. "
                    + "If you do a good job, I'll give you a $20 tip. "
                    + "Please answer in HTML, CSS, and JS. Please make the page sincerely, and use everything you can.");

            messages.add(userMessage);
            messages.add(systemMessage);

            jsonBody.set("messages", messages);
            jsonBody.put("temperature", 1);
            jsonBody.put("max_tokens", 10000);
            jsonBody.put("top_p", 1);
            jsonBody.put("frequency_penalty", 0);
            jsonBody.put("presence_penalty", 0);

            // 요청 본문 전송
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = objectMapper.writeValueAsBytes(jsonBody);
                os.write(input, 0, input.length);
            }

            // 응답 처리
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
                StringBuilder response = new StringBuilder();
                String line;

                while ((line = in.readLine()) != null) {
                    response.append(line);
                }
                in.close();

                // Jackson으로 JSON 응답 처리
                ObjectNode jsonResponse = objectMapper.readValue(response.toString(), ObjectNode.class);
                ArrayNode choices = (ArrayNode) jsonResponse.get("choices");
                String answer = choices.get(0).get("message").get("content").asText(); 
                System.out.println(answer);
                return answer; // 데이터 반환

            } else {
                System.out.println("Error in API request: " + responseCode);
                return null;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
