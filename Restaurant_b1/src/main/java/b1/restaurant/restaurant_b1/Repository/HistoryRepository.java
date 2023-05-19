package b1.restaurant.restaurant_b1.Repository;

import b1.restaurant.restaurant_b1.Entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface HistoryRepository extends JpaRepository<History, Integer> {
}
