package b1.restaurant.restaurant_b1.Repository;

import b1.restaurant.restaurant_b1.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Optional<Category> findCategoriesById(Integer id);

    boolean existsCategoryByNameEqualsIgnoreCase(String name);
    boolean existsCategoryByNameEqualsIgnoreCaseAndIdNot(String name, Integer id);
}
