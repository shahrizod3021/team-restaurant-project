package b1.restaurant.restaurant_b1.Controller;

import b1.restaurant.restaurant_b1.Payload.ResRestaurant;
import b1.restaurant.restaurant_b1.Service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/restaurant")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping
    public HttpEntity<?> getRestaurant(){
        ResRestaurant restaurant = restaurantService.getRestaurant();
        return ResponseEntity.ok(restaurant);
    }

}
