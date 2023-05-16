package b1.restaurant.restaurant_b1.Controller;

import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Payload.ReqColor;
import b1.restaurant.restaurant_b1.Payload.ResColor;
import b1.restaurant.restaurant_b1.Service.ColorService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/color")
@RequiredArgsConstructor
public class ColorController {

    private final ColorService colorService;


    @GetMapping("/{id}")
    public HttpEntity<?> getColor(@PathVariable UUID id){
        ResColor color = colorService.getColor(id);
        return ResponseEntity.ok(color);
    }

    @PutMapping
    public HttpEntity<?> changeColor(@RequestBody ReqColor reqColor){
        ApiResponse apiResponse = colorService.changeColor(reqColor);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
}
