package b1.restaurant.restaurant_b1.Repository;

import b1.restaurant.restaurant_b1.Entity.History;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Integer> {
}
