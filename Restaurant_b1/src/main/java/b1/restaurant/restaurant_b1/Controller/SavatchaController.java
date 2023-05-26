package b1.restaurant.restaurant_b1.Controller;

import b1.restaurant.restaurant_b1.Entity.Aksiya;
import b1.restaurant.restaurant_b1.Entity.Product;
import b1.restaurant.restaurant_b1.Entity.Savatcha;
import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Repository.AksiyaRepository;
import b1.restaurant.restaurant_b1.Repository.ProductRepository;
import b1.restaurant.restaurant_b1.Repository.SavatchaRepository;
import b1.restaurant.restaurant_b1.Service.SavatchaService;
import lombok.RequiredArgsConstructor;
import org.glassfish.jersey.internal.routing.RequestSpecificConsumesProducesAcceptor;
import org.hibernate.type.IntegerType;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/api/basket")
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class SavatchaController {

    private final SavatchaRepository savatchaRepository;
    private final SavatchaService savatchaService;

    @GetMapping("/{id}")
    public HttpEntity<?> getBasketOfOneUser(@PathVariable UUID id){
        Savatcha basketOfOneUser = savatchaService.getBaseketOfOneUser(id);
        return ResponseEntity.ok(basketOfOneUser);
    }

    @PostMapping
    public HttpEntity<?> addToBasket(@RequestParam(name = "uuid")UUID uuid, @RequestParam(name = "product")Integer productId, @RequestParam(name = "sale")Integer saleId){
        ApiResponse apiResponse = savatchaService.addToBasket(uuid, productId, saleId);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @DeleteMapping
    public HttpEntity<?> removeFromBasket(@RequestParam(name = "userId")UUID uuid, @RequestParam(name = "productId")Integer productId, @RequestParam(name = "saleId")Integer saleId){
        ApiResponse apiResponse = savatchaService.removeFromBasket(uuid, productId, saleId);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

}
