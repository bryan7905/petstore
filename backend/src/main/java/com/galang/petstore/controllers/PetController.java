package com.galang.petstore.controllers;

import com.galang.petstore.models.Pet;
import com.galang.petstore.models.Species;
import com.galang.petstore.services.PetService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/galang/v1/pets", "/galang/v1/pets/"})
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public List<Pet> getPets(@RequestParam(required = false) Species species) {
        return petService.getAllPets(species);
    }

    @GetMapping("/{id}")
    public Pet getPetById(@PathVariable Long id) {
        return petService.getPetById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pet createPet(@RequestBody Pet pet) {
        System.out.println("DEBUG: Received POST request at /galang/v1/pets with data: " + pet);
        return petService.createPet(pet);
    }

    @PutMapping("/{id}")
    public Pet updatePet(@PathVariable Long id, @RequestBody Pet pet) {
        return petService.updatePet(id, pet);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePet(@PathVariable Long id) {
        petService.deletePet(id);
    }
}
