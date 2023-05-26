package b1.restaurant.restaurant_b1.Controller;

import b1.restaurant.restaurant_b1.Entity.Category;
import b1.restaurant.restaurant_b1.Entity.Product;
import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Payload.ResProduct;
import b1.restaurant.restaurant_b1.Repository.CategoryRepository;
import b1.restaurant.restaurant_b1.Repository.ProductRepository;
import b1.restaurant.restaurant_b1.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
@CrossOrigin
public class ProductController {

    private final ProductService productService;

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    @GetMapping("/{id}")
    public HttpEntity<?> getProductOfOneCategory(@PathVariable Integer id){
        List<ResProduct> productOfOneCategory = productService.getProductOfOneCategory(id);
        return ResponseEntity.ok(productOfOneCategory);
    }

    @GetMapping("/list")
    public HttpEntity<?> getProduct(){
        List<Product> all = productRepository.findAll();
        return ResponseEntity.ok(all);
    }

    @PostMapping
    public HttpEntity<?> addProduct(@RequestParam(name = "name")String name, @RequestParam(name = "description")String description, @RequestParam(name = "price")double price, @RequestParam(name = "categoryId")Integer id){
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getCategoryForProduct"));
        Product build = Product.builder()
                .price(price)
                .description(description)
                .category(category)
                .sale(false)
                .build();
        build.setName(name);
        Product save = productRepository.save(build);
        return ResponseEntity.ok(save);
    }

    @PutMapping("/upload/{id}")
    public HttpEntity<?> editProductPhoto(@PathVariable Integer id, @RequestParam(name = "productPhoto") UUID photoId){
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getProduct"));
        product.setPhotoId(photoId);
        productRepository.save(product);
        return ResponseEntity.ok(new ApiResponse("Mahsulot saqlandi", true));
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteProduct (@PathVariable Integer id){
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("deleteProduct"));
        productRepository.delete(product);
        return ResponseEntity.ok(new ApiResponse("mahsulot o'chirildi", true));
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editProduct(@PathVariable Integer id, @RequestParam(name = "name", required = false)String name, @RequestParam(name = "description", required = false) String description, @RequestParam(name = "price", required = false)double price){
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("editProduct"));
        if (name.trim().length() != 0){
            product.setName(name);
        }
        if (description.trim().length() != 0){
            product.setDescription(description);
        }
        if (price != 0){
            product.setPrice(price);
        }
        productRepository.save(product);
        return ResponseEntity.ok(new ApiResponse("Mahsulot taxrirlandi", true));
    }
}
