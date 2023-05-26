package b1.restaurant.restaurant_b1.Controller;

import b1.restaurant.restaurant_b1.Entity.Category;
import b1.restaurant.restaurant_b1.Entity.Product;
import b1.restaurant.restaurant_b1.Payload.SearchDto;
import b1.restaurant.restaurant_b1.Repository.CategoryRepository;
import b1.restaurant.restaurant_b1.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    public final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    @PostMapping
    public HttpEntity<?> search(@RequestParam(name = "query")String name){
        List<Product> products = new ArrayList<>();
        Category category = new Category();
        if (productRepository.existsProductByNameEqualsIgnoreCase(name)){
            products.clear();
            products.addAll(productRepository.findProductByNameEqualsIgnoreCase(name));
        }
        if (categoryRepository.existsCategoryByNameEqualsIgnoreCase(name)){
            category = null;
            category = categoryRepository.findCategoriesByNameEqualsIgnoreCase(name);

        }
        if (!products.isEmpty()){
            return ResponseEntity.ok(SearchDto.builder()
                    .path("/product/" + name)
                    .products(products).build());
        }
        if (category.getName() != null){
            return ResponseEntity.ok(SearchDto.builder()
                    .path("/category/" + name)
                    .categoryId(category.getId())
                    .build());
        }
        return null;
    }
}
