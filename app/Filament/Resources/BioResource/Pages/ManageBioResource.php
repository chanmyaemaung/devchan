<?php

namespace App\Filament\Resources\TechStackResource\Pages;

use App\Filament\Resources\BioResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageBioResource extends ManageRecords
{
    protected static string $resource = BioResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
