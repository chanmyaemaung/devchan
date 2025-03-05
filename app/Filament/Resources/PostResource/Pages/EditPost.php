<?php

namespace App\Filament\Resources\PostResource\Pages;

use App\Filament\Resources\PostResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPost extends EditRecord
{
    protected static string $resource = PostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    /**
     * Remove sensitive attributes from JavaScript.
     *
     * @param array $data
     * @return array
     */
    protected function mutateFormDataBeforeFill(array $data): array
    {
        // Remove sensitive data that shouldn't be exposed to JavaScript
        // For example, if you have any admin-only flags or internal data
        unset($data['views']);

        // If you're using the hidden author_id field and want to ensure it's not manipulated
        // You can keep it but ensure it's properly validated server-side

        return $data;
    }
}
