package b1.restaurant.restaurant_b1.Service;

import b1.restaurant.restaurant_b1.Entity.Product;
import b1.restaurant.restaurant_b1.Payload.ResProduct;
import b1.restaurant.restaurant_b1.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ResProduct> getProductOfOneCategory(Integer id){
        List<ResProduct > resProducts = new ArrayList<>();
        for (Product product : productRepository.findProductByCategoryId(id)) {
            ResProduct build = ResProduct.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .price(product.getPrice())
                    .desciption(product.getDescription())
                    .photoId(product.getPhotoId())
                    .sale(product.isSale())
                    .build();
            resProducts.add(build);
        }
        return resProducts;
    }
}
