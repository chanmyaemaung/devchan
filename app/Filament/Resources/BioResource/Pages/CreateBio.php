<?php

namespace App\Filament\Resources\BioResource\Pages;

use App\Filament\Resources\BioResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateBio extends CreateRecord
{
    protected static string $resource = BioResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = auth()->guard()->id();

        return $data;
    }
}
