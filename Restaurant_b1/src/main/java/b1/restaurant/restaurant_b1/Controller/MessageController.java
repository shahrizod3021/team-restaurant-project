package b1.restaurant.restaurant_b1.Controller;

import b1.restaurant.restaurant_b1.Entity.Notification;
import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/message")
@RequiredArgsConstructor
public class MessageController {

    private final MessageRepository messageRepository;

    @GetMapping("/list")
    public HttpEntity<?> getMessage(){
        List<Notification> all = messageRepository.findAll();
        return ResponseEntity.ok(all);
    }

    @PostMapping
    public HttpEntity<?> sendMessage(@RequestParam(name = "name")String name, @RequestParam(name = "phoneNumber")String phoneNumber, @RequestParam(name = "message")String message, @RequestParam(name = "photoId")UUID photoId){
        Notification build = Notification.builder()
                .message(message)
                .photoId(photoId)
                .time(new Date())
                .phoneNumber(phoneNumber)
                .build();
        build.setName(name);
        messageRepository.save(build);
        return ResponseEntity.ok(new ApiResponse("Habar yuborilidi", true));
    }
}
