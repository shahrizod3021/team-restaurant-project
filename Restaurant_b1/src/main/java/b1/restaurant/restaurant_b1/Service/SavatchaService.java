package b1.restaurant.restaurant_b1.Service;

import b1.restaurant.restaurant_b1.Entity.Aksiya;
import b1.restaurant.restaurant_b1.Entity.Product;
import b1.restaurant.restaurant_b1.Entity.Savatcha;
import b1.restaurant.restaurant_b1.Entity.User;
import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Repository.AksiyaRepository;
import b1.restaurant.restaurant_b1.Repository.AuthRepository;
import b1.restaurant.restaurant_b1.Repository.ProductRepository;
import b1.restaurant.restaurant_b1.Repository.SavatchaRepository;
import javassist.tools.reflect.Sample;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SavatchaService {

    private final SavatchaRepository savatchaRepository;

    private final ProductRepository productRepository;

    private final AksiyaRepository aksiyaRepository;

    private final AuthRepository authRepository;

    public ApiResponse addToBasket(UUID id, Integer productId, Integer saleId) {
        ApiResponse apiResponse = new ApiResponse();
        User user = authRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUSer"));
        if (productId != 0) {
            if (user.getSavatchas().getProduct().size() > 0) {
                for (Product product : user.getSavatchas().getProduct()) {
                    if (product.getId().equals(productId)) {
                          return new ApiResponse("ushbu mahsulot savatchangizda mavjud", false);
                    }
                    apiResponse = new ApiResponse("savatchaga saqlandi", true);
                }
                if (apiResponse.isSuccess()){
                    Product product1 = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("getProduct"));
                    user.getSavatchas().getProduct().add(product1);
                    authRepository.save(user);
                }
                return apiResponse;
            }
            Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("getProduct"));
            user.getSavatchas().getProduct().add(product);
            authRepository.save(user);
            return new ApiResponse("savatchaga saqlandi", true);
        }
        if (user.getSavatchas().getAksiya().size() > 0) {
            for (Aksiya aksiya : user.getSavatchas().getAksiya()) {
                if (aksiya.getId().equals(saleId)) {
                    return new ApiResponse("Ushbu aksiya savatchada mavjud", false);
                }
                apiResponse = new ApiResponse("savatchaga saqlandi", true);
            }
            if (apiResponse.isSuccess()){
                Aksiya aksiya1 = aksiyaRepository.findById(saleId).orElseThrow(() -> new ResourceNotFoundException("getSale"));
                user.getSavatchas().getAksiya().add(aksiya1);
                authRepository.save(user);
            }
            return apiResponse;
        }
        Aksiya aksiya1 = aksiyaRepository.findById(saleId).orElseThrow(() -> new ResourceNotFoundException("getSale"));
        user.getSavatchas().getAksiya().add(aksiya1);
        authRepository.save(user);
        return new ApiResponse("savatchaga saqlandi", true);
    }

    public Savatcha getBaseketOfOneUser(UUID uuid) {
        User user = authRepository.findById(uuid).orElseThrow(() -> new ResourceNotFoundException("GetCustomer"));
        return user.getSavatchas();
    }

    public ApiResponse removeFromBasket(UUID uuid,Integer id, Integer saleId){
        User user = authRepository.findById(uuid).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        if (id != 0) {
            Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getProduct"));
            user.getSavatchas().getProduct().remove(product);
            authRepository.save(user);
            return new ApiResponse("olib tashlandi", true);
        }
        Aksiya aksiya = aksiyaRepository.findById(saleId).orElseThrow(() -> new ResourceNotFoundException("getSale"));
        user.getSavatchas().getAksiya().remove(aksiya);
        authRepository.save(user);
        return new ApiResponse("olib tashlandi",true);
    }
}
