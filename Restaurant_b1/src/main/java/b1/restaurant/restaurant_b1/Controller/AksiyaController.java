package b1.restaurant.restaurant_b1.Controller;

import b1.restaurant.restaurant_b1.Entity.Aksiya;
import b1.restaurant.restaurant_b1.Entity.Category;
import b1.restaurant.restaurant_b1.Entity.Product;
import b1.restaurant.restaurant_b1.Payload.ReqSale;
import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Payload.SelectDto;
import b1.restaurant.restaurant_b1.Repository.AksiyaRepository;
import b1.restaurant.restaurant_b1.Repository.CategoryRepository;
import b1.restaurant.restaurant_b1.Repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/sale")
@RequiredArgsConstructor
public class AksiyaController {

    private final AksiyaRepository aksiyaRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @GetMapping("/list")
    public HttpEntity<?> getSales() {
        List<Aksiya> all = aksiyaRepository.findAll();
        return ResponseEntity.ok(all);
    }



    @PostMapping
    public HttpEntity<?> addSale(@RequestBody ReqSale reqSale) {
        List<Product> products = new ArrayList<>();
        for (SelectDto selectDto : reqSale.getProductsId()) {
            Product product = productRepository.findById(selectDto.getValue()).orElseThrow(() -> new ResourceNotFoundException("getProduct"));
            product.getCategory().setSale(true);
            products.add(product);
            product.setSale(true);
            productRepository.save(product);
        }
        double allPrice = 0;
        double pastPrice  = 0;
        Aksiya build = Aksiya.builder()
                .foyiz(reqSale.getFoiz())
                .active(true)
                .products(products)
                .foyiz(reqSale.getFoiz())
                .build();
        for (Product product : products) {
            allPrice = allPrice + product.getPrice();
            pastPrice = pastPrice + product.getPrice();
        }
        double salesPrice = allPrice * reqSale.getFoiz() / 100;
        double allSalesPrice = allPrice - salesPrice;
        build.setAllPrice(allSalesPrice);
        build.setPastPrice(pastPrice);
        build.setName(reqSale.name);
        Aksiya save = aksiyaRepository.save(build);
        return ResponseEntity.ok(save);
    }

    @PutMapping("/upload/{id}")
    public HttpEntity<?> editCategory(@PathVariable Integer id, @RequestParam(name = "salePhoto") UUID photoId) {
        Aksiya aksiya = aksiyaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getSale"));
        aksiya.setPhotoId(photoId);
        aksiyaRepository.save(aksiya);
        return ResponseEntity.ok(new ApiResponse("Aksiya saqlandi", true));
    }
}
