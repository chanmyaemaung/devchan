<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BioResource\Pages;
use App\Filament\Resources\BioResource\RelationManagers;
use App\Filament\Resources\TechStackResource\Pages\ManageBioResource;
use App\Models\Bio;
use Faker\Provider\ar_EG\Text;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class BioResource extends Resource
{
    protected static ?string $model = Bio::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    protected static ?string $navigationGroup = 'Portfolio Settings';
    protected static ?string $navigationLabel = 'Bio';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make(('greeting'))
                    ->nullable(),
                TextInput::make('title')
                    ->nullable(),
                Textarea::make('description')
                    ->nullable(),
                FileUpload::make('avatar')
                    ->image()
                    ->nullable(),
                TextInput::make('cta_btn_title')
                    ->label(__('Call to Action Button Title'))
                    ->nullable(),
                TextInput::make('cta_btn_url')
                    ->label(__('Call to Action Button URL'))
                    ->url()
                    ->nullable(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('greeting'),
                TextColumn::make('title')
                    ->label(__('Title'))
                    ->words(3),
                TextColumn::make('description')
                    ->label(__('Description'))
                    ->words(3),
                TextColumn::make('cta_btn_title')
                    ->label(__('Call to Action Button Title')),
                TextColumn::make('cta_btn_url')
                    ->label(__('Call to Action Button URL')),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                // Filter::make('created_at'),
                // Filter::make('updated_at'),
            ])
            ->actions([
                ActionGroup::make([
                    EditAction::make(),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    // Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->searchDebounce('500ms')
            ->paginated(false);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageBioResource::route('/'),
        ];
    }
}
