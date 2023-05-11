package b1.restaurant.restaurant_b1.Controller;


import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Payload.ReqCategory;
import b1.restaurant.restaurant_b1.Payload.ResCategory;
import b1.restaurant.restaurant_b1.Service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/category")
@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/list")
    public HttpEntity<?> getCategory() {
        List<ResCategory> category = categoryService.getCategory();
        return ResponseEntity.ok(category);
    }

    @PostMapping
    public HttpEntity<?> addCategory(@RequestBody ReqCategory reqCategory){
        ApiResponse apiResponse = categoryService.addCategory(reqCategory);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
}
