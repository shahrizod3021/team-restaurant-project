package b1.restaurant.restaurant_b1;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class Deletable  {

    public String delete(List<?> array, Integer id) {
        Object o = new Object();
        if (array.size() < id) {
            int i = array.size() + 1 - id ;
            try {
                o = array.get(id - i);
                array.remove(o);
                return "olib tashlandi";
            } catch (IndexOutOfBoundsException e) {
                return "bunday narsa topiladmi";
            }
        }
        o = array.get(id - 1);
        array.remove(o);
        return "olib tashlandi";
    }

}
