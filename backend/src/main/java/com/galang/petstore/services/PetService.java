package com.galang.petstore.services;

import com.galang.petstore.models.Pet;
import com.galang.petstore.models.Species;
import com.galang.petstore.repositories.PetRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> getAllPets(Species species) {
        if (species != null) {
            return petRepository.findBySpecies(species);
        }
        return petRepository.findAll();
    }

    public Pet getPetById(Long id) {
        return petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found with id: " + id));
    }

    @Transactional
    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }

    @Transactional
    public Pet updatePet(Long id, Pet petDetails) {
        Pet pet = getPetById(id);
        pet.setName(petDetails.getName());
        pet.setSpecies(petDetails.getSpecies());
        pet.setPrice(petDetails.getPrice());
        pet.setImageUrl(petDetails.getImageUrl());
        return petRepository.save(pet);
    }

    @Transactional
    public void deletePet(Long id) {
        Pet pet = getPetById(id);
        petRepository.delete(pet);
    }
}
