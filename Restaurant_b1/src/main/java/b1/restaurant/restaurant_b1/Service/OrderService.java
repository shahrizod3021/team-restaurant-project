package b1.restaurant.restaurant_b1.Service;

import b1.restaurant.restaurant_b1.Entity.*;
import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Payload.OrderDto;
import b1.restaurant.restaurant_b1.Repository.*;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.LifecycleState;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final ZakazRepository zakazRepository;

    private final AuthRepository authRepository;

    private final ProductRepository productRepository;

    private final AksiyaRepository aksiyaRepository;
    private final RestaurantRepository restaurantRepository;
    private final HistoryRepository historyRepository;

    public List<OrderDto> getOrder(UUID id) {
        User user = authRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUsersOrder"));
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Zakaz zakaz : user.getZakazList()) {
            OrderDto orderDto = OrderDto.builder()
                    .name(zakaz.getName())
                    .oy(zakaz.getDate().getMonth())
                    .yil(zakaz.getDate().getYear())
                    .kun(zakaz.getDate().getDate())
                    .aksiya(zakaz.getAksiya())
                    .product(zakaz.getProducts())
                    .delivered(zakaz.isDelivered())
                    .allPrice(zakaz.getAllPrice())
                    .build();
            orderDtos.add(orderDto);
        }
        return orderDtos;
    }

    public ApiResponse ordering(UUID id,Integer howMuch, double price,  Integer productId, Integer aksiyaId){
        User user = authRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        if (aksiyaId == 0) {
            Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("getProduct"));
            Zakaz build = Zakaz.builder()
                    .allPrice(price)
                    .products(product)
                    .date(new Date())
                    .delivered(false)
                    .howMuch(howMuch)
                    .build();
            build.setName(product.getName());
            user.getZakazList().add(build);
            Zakaz save = zakazRepository.save(build);
            authRepository.save(user);
            History history = History.builder()
                    .zakaz(save)
                    .date(new Date())
                    .build();
            history.setName(user.getName());
            historyRepository.save(history);
            return new ApiResponse("Zakazingiz qabul qilindi", true);
        }
        Aksiya aksiya = aksiyaRepository.findById(aksiyaId).orElseThrow(() -> new ResourceNotFoundException("getAksiya"));
        Zakaz build = Zakaz.builder()
                .delivered(false)
                .aksiya(aksiya)
                .allPrice(price)
                .howMuch(howMuch)
                .date(new Date())
                .build();
        build.setName(aksiya.getName());
        user.getZakazList().add(build);
        Zakaz save = zakazRepository.save(build);
        authRepository.save(user);
        History history = History.builder()
                .zakaz(save)
                .date(new Date())
                .build();
        history.setName(user.getName());
        historyRepository.save(history);
        return new ApiResponse("Zakazingiz qabul qilindi", true);
    }

    public ApiResponse orderjon(Integer id){
        Zakaz getOrder = zakazRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getOrder"));
        Restaurant restaurant = restaurantRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException("getRestaurant"));
        restaurant.setProfit(restaurant.getProfit() + getOrder.getAllPrice());
        getOrder.setDelivered(true);
        zakazRepository.save(getOrder);
        restaurantRepository.save(restaurant);
        return new ApiResponse("Zakaz yetqailindi",true);
    }
}
