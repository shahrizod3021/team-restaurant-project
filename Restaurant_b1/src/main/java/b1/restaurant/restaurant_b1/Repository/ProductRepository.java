package b1.restaurant.restaurant_b1.Repository;

import b1.restaurant.restaurant_b1.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findProductByCategoryId(Integer category_id);

    List<Product> findAllProductByCategoryId(Integer category_id);

    List<Product> findProductByNameEqualsIgnoreCase(String name);

    boolean existsProductByNameEqualsIgnoreCase(String name);
}
