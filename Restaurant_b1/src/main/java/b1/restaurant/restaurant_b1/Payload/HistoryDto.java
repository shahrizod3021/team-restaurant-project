package b1.restaurant.restaurant_b1.Payload;

import b1.restaurant.restaurant_b1.Entity.Zakaz;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.dao.DataAccessException;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HistoryDto {
    private Integer id;
    private String name;
    private Date date;
    private Zakaz zakaz;
}
