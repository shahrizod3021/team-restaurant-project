package b1.restaurant.restaurant_b1.Controller;

import b1.restaurant.restaurant_b1.Entity.*;
import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Payload.OrderDto;
import b1.restaurant.restaurant_b1.Repository.*;
import b1.restaurant.restaurant_b1.Service.OrderService;
import com.sun.xml.internal.ws.policy.EffectiveAlternativeSelector;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class ZakazController {

    private final ZakazRepository zakazRepository;

    private final OrderService orderDtos;

    @PostMapping
    public HttpEntity<?> ordering(@RequestParam(name = "id") UUID id, @RequestParam(name = "howMuch")Integer howMuch, @RequestParam(name = "allPrice") double price, @RequestParam(name = "product") Integer productId, @RequestParam(name = "sale") Integer aksiyaId) {
        ApiResponse ordering = orderDtos.ordering(id,howMuch, price, productId, aksiyaId);
        return ResponseEntity.status(ordering.isSuccess() ? 200 : 409).body(ordering);
    }

    @GetMapping("/list")
    public HttpEntity<?> getOrder() {
        List<Zakaz> zakazs = new ArrayList<>();
        for (Zakaz zakaz : zakazRepository.findAll()) {
            if (!zakaz.isDelivered()){
                zakazs.add(zakaz);
            }
        }
        return ResponseEntity.ok(zakazs);
    }

    @GetMapping("/ordered")
    public HttpEntity<?> getOrdered(){
        List<Zakaz> zakazs = new ArrayList<>();
        for (Zakaz zakaz : zakazRepository.findAll()) {
            if (zakaz.isDelivered()){
                zakazs.add(zakaz);
            }
        }
        return ResponseEntity.ok(zakazs);
    }

    @GetMapping("/myOrder/{id}")
    public HttpEntity<?> getMyOrder (@PathVariable UUID id) {
        List<OrderDto> order = orderDtos.getOrder(id);
        return ResponseEntity.ok(order);
    }


    @GetMapping("/{id}")
    public HttpEntity<?> getOneOrder(@PathVariable Integer id){
        Zakaz getOneOrder = zakazRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getOneOrder"));
        return ResponseEntity.ok(getOneOrder);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> deliviring(@PathVariable Integer id){
        ApiResponse orderjon = orderDtos.orderjon(id);
        return ResponseEntity.status(orderjon.isSuccess() ? 200 : 409).body(orderjon);
    }
}