package b1.restaurant.restaurant_b1.Service;

import b1.restaurant.restaurant_b1.Entity.Category;
import b1.restaurant.restaurant_b1.Payload.ApiResponse;
import b1.restaurant.restaurant_b1.Payload.ReqCategory;
import b1.restaurant.restaurant_b1.Payload.ResCategory;
import b1.restaurant.restaurant_b1.Repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<ResCategory> getCategory(){
        List<ResCategory> resCategories = new ArrayList<>();
        for (Category category : categoryRepository.findAll()) {
            ResCategory build = ResCategory.builder()
                    .id(category.getId())
                    .name(category.getName())
                    .photoId(category.getPhotoId())
                    .build();
            resCategories.add(build);
        }
        return resCategories;
    }


    public ApiResponse addCategory(ReqCategory reqCategory){
        if (!categoryRepository.existsCategoryByNameEqualsIgnoreCase(reqCategory.getName())){
            Category category = new Category(reqCategory.getName());
            categoryRepository.save(category);
            return new ApiResponse("Categoriya saqalandi", true);
        }
        return new ApiResponse("bunday categoriya bizda avvaldan mavjud", false);
    }
}
