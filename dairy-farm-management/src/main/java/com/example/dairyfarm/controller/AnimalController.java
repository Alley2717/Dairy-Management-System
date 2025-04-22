/* package com.example.dairyfarm.controller;

import com.example.dairyfarm.model.Animal;
import com.example.dairyfarm.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@RestController
@RequestMapping("/animals")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    // Handles POST form submission from add-animal.html
    @PostMapping("/add")
    public String addAnimal(@ModelAttribute Animal animal) {
        animalService.addAnimal(animal);
        return "Animal added successfully!";
    }

    // Handles GET request for all animals
    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalService.getAllAnimals();
    }

    // Clones an existing animal using the prototype pattern
    @GetMapping("/clone/{id}")
    public Animal cloneAnimal(@PathVariable String id) {
        return animalService.cloneAnimal(id);
    }

    // Redirects GET /animals/add to static add-animal.html
    @GetMapping("/add")
    public RedirectView redirectToForm() {
        return new RedirectView("/add-animal.html");
    }
}
 */
// AnimalController.java - dummy content for now












/* package com.example.dairyfarm.controller;

import com.example.dairyfarm.model.Animal;
import com.example.dairyfarm.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/animals")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @PostMapping("/add")
    public String addAnimal(@RequestBody Animal animal) {
        animalService.addAnimal(animal);
        return "Animal added successfully!";
    }

    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalService.getAllAnimals();
    }

    @GetMapping("/clone/{id}")
    public Animal cloneAnimal(@PathVariable String id) {
        return animalService.cloneAnimal(id);
    }
} */







/*package com.example.dairyfarm.controller;

import com.example.dairyfarm.model.Animal;
import com.example.dairyfarm.model.MilkRecord;
import com.example.dairyfarm.service.AnimalService;
import com.example.dairyfarm.service.MilkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/animals")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @Autowired
    private MilkService milkService;

    @PostMapping("/add")
    public String addAnimal(@RequestBody Animal animal) {
        animalService.addAnimal(animal);
        return "Animal added successfully!";
    }

    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalService.getAllAnimals();
    }

    @PostMapping("/clone/{id}")
    public Animal cloneAnimal(@PathVariable String id) {
        return animalService.cloneAnimal(id);
    }

    @PutMapping("/update/{id}")
    public String updateAnimal(@PathVariable String id, @RequestBody Animal updated) {
        animalService.updateAnimal(id, updated);
        return "Animal updated successfully!";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAnimal(@PathVariable String id) {
        animalService.deleteAnimal(id);
        return "Animal deleted successfully!";
    }

    @PostMapping("/{id}/milk-record")
    public String addMilkRecord(@PathVariable String id, @RequestBody MilkRecord record) {
        milkService.addMilkRecord(id, record);
        return "Milk record added for animal " + id;
    }
}
*/

package com.example.dairyfarm.controller;

import com.example.dairyfarm.model.Animal;
import com.example.dairyfarm.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin(origins = "*")
public class AnimalController {

    private final AnimalService animalService;

    @Autowired
    public AnimalController(AnimalService animalService) {
        this.animalService = animalService;
    }

    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalService.getAllAnimals();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> getAnimalById(@PathVariable Long id) {
        return animalService.getAnimalById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Animal createAnimal(@RequestBody Animal animal) {
        return animalService.saveAnimal(animal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animal> updateAnimal(@PathVariable Long id, @RequestBody Animal animalDetails) {
        try {
            Animal updatedAnimal = animalService.updateAnimal(id, animalDetails);
            return ResponseEntity.ok(updatedAnimal);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable Long id) {
        try {
            animalService.deleteAnimal(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}