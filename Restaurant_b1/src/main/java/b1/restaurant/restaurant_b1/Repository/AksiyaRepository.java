package b1.restaurant.restaurant_b1.Repository;

import b1.restaurant.restaurant_b1.Entity.Aksiya;
import org.apache.catalina.LifecycleState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
public interface AksiyaRepository extends JpaRepository<Aksiya, Integer> {


}
