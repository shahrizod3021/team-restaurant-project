package b1.restaurant.restaurant_b1.Entity;

import b1.restaurant.restaurant_b1.Entity.AbsEntity.AbsNameEntity;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import lombok.*;

import javax.persistence.Entity;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Category extends AbsNameEntity {

    private UUID photoId;

    private boolean sale;

    public Category(String name, boolean sale) {
        super(name);
        this.sale = sale;
    }

}
