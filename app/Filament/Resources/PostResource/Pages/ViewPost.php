<?php

namespace App\Filament\Resources\PostResource\Pages;

use App\Filament\Resources\PostResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewPost extends ViewRecord
{
    protected static string $resource = PostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }

    /**
     * Increment the view count before filling the form.
     */
    protected function beforeFill(): void
    {
        // Increment the view count, indicating it's from the admin panel
        $this->record->incrementViews(true);
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
        // Note: You might want to keep 'views' visible in the admin panel
        // unset($data['views']);
        return $data;
    }
}
