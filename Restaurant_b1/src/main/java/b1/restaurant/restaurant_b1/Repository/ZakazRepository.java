package b1.restaurant.restaurant_b1.Repository;

import b1.restaurant.restaurant_b1.Entity.Zakaz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ZakazRepository extends JpaRepository<Zakaz, Integer> {

}
