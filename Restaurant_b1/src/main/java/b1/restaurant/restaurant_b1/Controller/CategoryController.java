package b1.restaurant.restaurant_b1.Controller;


import b1.restaurant.restaurant_b1.Entity.Category;
import b1.restaurant.restaurant_b1.Entity.Product;
import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Payload.ReqCategory;
import b1.restaurant.restaurant_b1.Repository.CategoryRepository;
import b1.restaurant.restaurant_b1.Repository.ProductRepository;
import b1.restaurant.restaurant_b1.Service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/api/category")
@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @GetMapping("/list")
    public HttpEntity<?> getCategory() {
        List<Category> all = categoryRepository.findAll();
        return ResponseEntity.ok(all);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOneCategory(@PathVariable Integer id){
        Category category = categoryRepository.findCategoriesById(id).orElseThrow(() -> new ResourceNotFoundException("getOneCategory"));
        return ResponseEntity.ok(category);
    }

    @PostMapping
    public HttpEntity<?> addCategory(@RequestBody ReqCategory reqCategory) {
        Category category = categoryService.addCategory(reqCategory);
        return ResponseEntity.status(category != null ? 200  : 409).body(category);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editCategory(@PathVariable Integer id, @RequestBody ReqCategory reqCategory) {
        ApiResponse apiResponse = categoryService.editCategory(id, reqCategory);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @PutMapping("/upload/{id}")
    public HttpEntity<?> editCategory(@PathVariable Integer id, @RequestParam(name = "categoryPhoto") UUID photoId){
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getCategorty"));
        category.setPhotoId(photoId);
        categoryRepository.save(category);
        return ResponseEntity.ok(new ApiResponse("Categoriya saqlandi", true));
    }


    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteCategory(@PathVariable Integer id) {
        productRepository.deleteAll(productRepository.findProductByCategoryId(id));
        ApiResponse apiResponse = categoryService.deleteCategory(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
}
