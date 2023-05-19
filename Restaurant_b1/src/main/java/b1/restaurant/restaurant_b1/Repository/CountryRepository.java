package b1.restaurant.restaurant_b1.Repository;

import b1.restaurant.restaurant_b1.Entity.Country;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface CountryRepository extends JpaRepository<Country, Integer> {

    boolean existsCountryByNameEqualsIgnoreCase(String name);
}
