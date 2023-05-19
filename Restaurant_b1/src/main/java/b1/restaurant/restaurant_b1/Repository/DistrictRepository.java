package b1.restaurant.restaurant_b1.Repository;

import b1.restaurant.restaurant_b1.Entity.District;
import b1.restaurant.restaurant_b1.Entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
public interface DistrictRepository extends JpaRepository<District, Integer> {

    boolean existsDistrictByNameEqualsIgnoreCase(String name);

    List<District> findDistrictsByRegion_Id(Integer region_id);
}
