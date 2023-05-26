package b1.restaurant.restaurant_b1.Repository;

import b1.restaurant.restaurant_b1.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Notification, Integer> {

}
