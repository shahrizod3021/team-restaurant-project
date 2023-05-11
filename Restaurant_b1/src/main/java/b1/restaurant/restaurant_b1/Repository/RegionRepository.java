package b1.restaurant.restaurant_b1.Repository;

import b1.restaurant.restaurant_b1.Entity.Country;
import b1.restaurant.restaurant_b1.Entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegionRepository extends JpaRepository<Region, Integer> {

    boolean existsRegionByNameEqualsIgnoreCase(String name);

    List<Region> findRegionByCountries_Id(Integer countries_id);
}
