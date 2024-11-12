package com.jocomi.jcm.api.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@CrossOrigin(origins = "http://localhost:3000")
@RestController	
public class AIController {

	private final String GPT_API_KEY ="";
	

    @PostMapping(value = "/view")
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
            systemMessage.put("content", "You are an expert web page developer and need to make fully designed web page using VSCode with HTML, CSS, js in html code. "
                    + "Answer with only codes and do not add any description or other content like '```html' or '```'. "
                    + "Logo has to be import later. Create logo position and write '(insert logo here)'. "
                    + "Header and footer must be contained, and footer must have class name and decorated by class name."
                    + "Follow the request. For example, if user asked to make search engine, you have to make search bar to type in."
                    + "If user asked to make online shopping mall, you have to list several items to sell."
                    + "If user asked to make company homePage, you have to contain details and informations about company."
                    + "If user asked to make offline shop homepage, you have to contain lists about menu or items and details, informations about company."
                    + "Please make menu bar which align centered, and if user click on an element of the menu bar, change UI to a completely new page."
                    + "Please make more than 5 pages, and each pages have to seperated more than 3 different section."
                    + "Each section has to contain texts more than 5 sentences and several images."
                    + "Each section has to be fully decorated with CSS not using tag name, using class name, with the latest trends. "
                    + "Use animation effects with JavaScript. "
                    + "Add CSS in HTML file using style tag. "
                    + "Add JS in HTML file using script tag. "
                    + "Use images also, and file paths should be 'http:localhost:3000/testImg/meeting.jpg' or "
                    + "'http:localhost:3000/testImg/board.jpg',"
                    + "'http:localhost:3000/testImg/container.jpg',"
                    + "'http:localhost:3000/testImg/building.jpg',"
                    + "'http:localhost:3000/testImg/river.jpg',"
                    + "'http:localhost:3000/testImg/sky.jpg',"
                    + "'http:localhost:3000/testImg/coffee.jpg',"
                    + "'http:localhost:3000/testImg/cafe.jpg',"
                    + "'http:localhost:3000/testImg/market.jpg',"
                    + "'http:localhost:3000/testImg/study.jpg',"
                    + "'http:localhost:3000/testImg/bakery.jpg',"
                    + "'http:localhost:3000/testImg/espresso.jpg',"
                    + "'http:localhost:3000/testImg/trader.jpg',"
                    + "'http:localhost:3000/testImg/stock.jpg',"
                    + "'http:localhost:3000/testImg/factory.jpg',"
                    + "'http:localhost:3000/testImg/credit.jpg',"
                    + "'http:localhost:3000/testImg/cash.jpg',"
                    + "'http:localhost:3000/testImg/fullDress.jpg',"
                    + "'http:localhost:3000/testImg/knit.jpg',"
                    + "'http:localhost:3000/testImg/shirt.jpg',"
                    + "'http:localhost:3000/testImg/company.jpg',"
                    + "'http:localhost:3000/testImg/co-work.jpg',"
                    + "'http:localhost:3000/testImg/conference.jpg',"
                    + "'http:localhost:3000/testImg/model.jpg',"
                    + "'http:localhost:3000/testImg/sofa.jpg',"
                    + "'http:localhost:3000/testImg/funiture.jpg',"
                    + "'http:localhost:3000/testImg/chair.jpg',"
                    + "'http:localhost:3000/testImg/table.jpg'"
                    + ". "
                    + "Please use the appropriate image for each page through the file path name."
                    + "Use background image also to decorate pages."
                    + "You can use one image multiple times, and also you can edit file with CSS. Please use image size with 100% width and 30% height contain via CSS. "
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
                
                
                String fileName = "test.html";
                saveToHtmlFile(answer, fileName);
                //return "/requestFiles"+fileName; // 데이터 반환
                
                
                
                return fileName;

            } else {
                System.out.println("Error in API request: " + responseCode);
                return null;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    @GetMapping("/show")
    public ModelAndView show(@RequestParam("name") String name, ModelAndView mv) {
    	
    	
    	mv.setViewName("/requestFiles/" + name);
    	
    	return mv;
    }
    
    
    private void saveToHtmlFile(String content, String fileName) {
    	String directoryPath = System.getProperty("user.dir") + "/src/main/resources/templates/requestFiles";
        
        // 디렉토리가 없는 경우 생성
        Path directory = Paths.get(directoryPath);
        if (Files.notExists(directory)) {
            try {
                Files.createDirectories(directory);
                System.out.println("Directory created at: " + directory.toAbsolutePath());
            } catch (IOException e) {
                System.out.println("Error creating directory: " + e.getMessage());
            }
        }

        // 파일 저장 경로 설정
        Path outputPath = Paths.get(directoryPath, fileName);
        try (BufferedWriter writer = Files.newBufferedWriter(outputPath)) {
            writer.write(content);
            System.out.println("HTML file saved successfully at: " + outputPath.toAbsolutePath());
        } catch (IOException e) {
            System.out.println("Error saving HTML file: " + e.getMessage());
        }
    }
}
