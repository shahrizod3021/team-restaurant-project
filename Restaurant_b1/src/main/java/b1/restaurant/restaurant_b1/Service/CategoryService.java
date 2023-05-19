package b1.restaurant.restaurant_b1.Service;

import b1.restaurant.restaurant_b1.Entity.Category;
import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Payload.ReqCategory;
import b1.restaurant.restaurant_b1.Payload.ReqDistrict;
import b1.restaurant.restaurant_b1.Payload.ResCategory;
import b1.restaurant.restaurant_b1.Repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category addCategory(ReqCategory reqCategory) {
        if (!categoryRepository.existsCategoryByNameEqualsIgnoreCase(reqCategory.getName())) {
            Category category = new Category(reqCategory.getName(), false);
            return categoryRepository.save(category);
        }
        return null;
    }

    public ApiResponse editCategory(Integer id, ReqCategory reqCategory) {
        Optional<Category> byId = categoryRepository.findById(id);
        if (byId.isPresent()) {
            Category category = byId.get();
            if (!categoryRepository.existsCategoryByNameEqualsIgnoreCaseAndIdNot(reqCategory.getName(), category.getId())) {
                category.setName(reqCategory.getName());
                categoryRepository.save(category);
                return new ApiResponse("categoriya taxrirlandi", true);
            }
            return new ApiResponse("bunday categoriya oldindan mavjud", false);
        }
        return new ApiResponse("Siz tanlagan categoriya topilmadi", false);
    }

    public ApiResponse deleteCategory(Integer id) {
//        Category category1 = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getCategory"));
//        categoryRepository.delete(category1);
        Optional<Category> byId = categoryRepository.findById(id);
        if (byId.isPresent()) {
            Category category = byId.get();
            categoryRepository.delete(category);
            return new ApiResponse("categoriya olib tashlandi", true);
        }
        return new ApiResponse("Siz tanlagan Categoriya topilamdi", false);
    }

}
