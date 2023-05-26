package b1.restaurant.restaurant_b1.Entity;

import b1.restaurant.restaurant_b1.Entity.AbsEntity.AbsNameEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Notification extends AbsNameEntity {

    @Column(length = 10000)
    private String message;

    @Column(nullable = false)
    private String phoneNumber;

    private UUID photoId;
    private Date time;
}
